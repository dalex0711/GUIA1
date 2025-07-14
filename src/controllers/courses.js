import { btnLogout } from '../services/logout.js';
import { apiRequest } from '../api/request.js';
import { getUserLogged } from '../services/storage.js';

let allCourses = []; // store all courses in memory

// 📌 Function to render any list of courses
async function renderCourses(courses, showEnroll = true) {
  const container = document.getElementById('courses-container');
  const template = document.getElementById('course-template');
  const user = getUserLogged();

  container.innerHTML = ''; // Clear previous content

  for (const course of courses) {
    const clone = template.content.cloneNode(true); // Clone the template

    // Insert course data
    clone.querySelector('.course-name').textContent = course.name;
    clone.querySelector('.course-capacity').textContent = `Capicity: ${course.capacity}`;

    const btn = clone.querySelector('.btn-action'); // The action button (enroll or unenroll)

    if (showEnroll) {
      // 👉 ENROLL button
      btn.textContent = 'Enroll';
      btn.addEventListener('click', async (e) => {
        const courseId = course.id;

        const enrollments = await apiRequest('GET', 'enrollments');
        const alreadyEnrolled = enrollments.some(enr =>
          enr.userId === user.id && enr.courseId === courseId
        );

        if (alreadyEnrolled) {
          alert('⚠️ You are already enrolled in this course.');
          return;
        }

        const currentCapacity = Number(course.capacity);
        if (currentCapacity <= 0) {
          alert('❌ No available slots.');
          return;
        }

        // Enroll the user
        await apiRequest('POST', 'enrollments', {
          userId: user.id,
          courseId
        });

        // Update course capacity
        const updatedCapacity = currentCapacity - 1;
        await apiRequest('PATCH', `events/${courseId}`, {
          capacity: String(updatedCapacity)
        });

        alert(`✅ Enrolled in ${course.name}`);
        clone.querySelector('.course-capacity').textContent = updatedCapacity;
        course.capacity = updatedCapacity;
      });
    } else {
      // 👉 UNENROLL button
      btn.textContent = 'Unenroll';
      btn.addEventListener('click', async () => {
        const enrollments = await apiRequest('GET', 'enrollments');
        const found = enrollments.find(e =>
          e.userId === user.id && e.courseId === course.id
        );

        if (!found) {
          alert('❌ You are not enrolled in this course.');
          return;
        }

        // Remove enrollment
        await apiRequest('DELETE', `enrollments/${found.id}`);

        // Optional: update capacity visually
        const updatedCapacity = Number(course.capacity) + 1;
        await apiRequest('PATCH', `events/${course.id}`, {
          capacity: String(updatedCapacity)
        });

        alert(`🗑️ Unenrolled from ${course.name}`);

        // Reload only the user's courses
        await renderUserCourses();
      });
    }

    // Append to the DOM
    container.appendChild(clone);
  }
}

// 📌 Render only the user's enrolled courses
async function renderUserCourses() {
  const user = getUserLogged();
  if (!user) return;

  const enrollments = await apiRequest('GET', 'enrollments');
  const userEnrollments = enrollments.filter(e => e.userId === user.id);

  const myCourses = allCourses.filter(c =>
    userEnrollments.some(e => e.courseId === c.id)
  );

  if (myCourses.length === 0) {
    document.getElementById('courses-container').innerHTML =
      `<p>You are not enrolled in any courses yet.</p>`;
    return;
  }

  // Render without enroll button (show "Unenroll")
  await renderCourses(myCourses, false);
}

// 🚀 Main initializer function
export async function init() {
  btnLogout(); // Activate logout

  allCourses = await apiRequest('GET', 'events'); // Load all courses from the server
  await renderCourses(allCourses); // Show all courses initially

  // Set up "My Courses" button
  document.getElementById('view-my-courses')?.addEventListener('click', (e) => {
    e.preventDefault();
    renderUserCourses(); // Show only enrolled courses
  });
}
