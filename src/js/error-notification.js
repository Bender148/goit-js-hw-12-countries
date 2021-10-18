import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../../node_modules/pnotify/dist/es/PNotifyButtons.js';
import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';

export default function showError(errorMessage) {
  PNotify.error({
    text: errorMessage,
    delay: 4000,
  });
}