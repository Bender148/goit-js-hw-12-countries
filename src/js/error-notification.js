import { alert} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

export default function showError(errorMessage) {
  alert.error({
    text: errorMessage,
    delay: 500,
  });
}