import PNotify from '@pnotify/core';

export default function showError(errorMessage) {
  PNotify.error({
    text: errorMessage,
    delay: 500,
  });
}