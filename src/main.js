import './style.css';
import { loadView,navigationTag} from './router.js';


loadView(location.pathname);
navigationTag();