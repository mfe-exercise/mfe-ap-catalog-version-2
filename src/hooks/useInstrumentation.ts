import { useEffect } from 'react';
import { EventNameEnum } from '../utils/constants';
import { SCREENS } from '../utils/screens';

export function useInstrumentation() {
  const saveEvent = (eventName: string, data: any) => {
    if (eventName === EventNameEnum.START) {
      localStorage.setItem('instrumentationEvents', JSON.stringify([]));
    }

    const events = JSON.parse(localStorage.getItem('instrumentationEvents') || '[]');
    const student = localStorage.getItem('student');
    events.push({ eventName, data, timestamp: new Date(), student });

    if (events.length > 5000 || eventName === EventNameEnum.END) {
      const jsonString = JSON.stringify(events, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${student}-logs-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      localStorage.setItem('instrumentationEvents', JSON.stringify([]));

      if (eventName === EventNameEnum.END) {
        window.alert('O limite de logs foi atingido! Seus logs foram baixados como um arquivo JSON.');
      }
    } else {
      localStorage.setItem('instrumentationEvents', JSON.stringify(events));
    }
  }

  useEffect(() => {
    window.addEventListener(EventNameEnum.CLICK, (event: Event) => {
      const customEvent = event as CustomEvent;
      saveEvent(EventNameEnum.CLICK, customEvent.detail);
    });
    window.addEventListener(EventNameEnum.VIEW, (event: Event) => {
      const customEvent = event as CustomEvent;
      saveEvent(EventNameEnum.VIEW, customEvent.detail);
    });
    window.addEventListener(EventNameEnum.SEARCH, (event: Event) => {
      const customEvent = event as CustomEvent;
      saveEvent(EventNameEnum.SEARCH, customEvent.detail);
    });
    window.addEventListener(EventNameEnum.START, (event: Event) => {
      const customEvent = event as CustomEvent;
      saveEvent(EventNameEnum.START, customEvent.detail);
    });
    window.addEventListener(EventNameEnum.END, (event: Event) => {
      const customEvent = event as CustomEvent;
      saveEvent(EventNameEnum.END, customEvent.detail);
    });
    window.addEventListener('focus', () => {
      if (window.location.href.includes(SCREENS.DETAILS.replace(':id', ''))) {
        saveEvent(EventNameEnum.FOCUS, { screen: document.title });
      }
    });
    window.addEventListener('blur', () => {
      if (window.location.href.includes(SCREENS.DETAILS.replace(':id', ''))) {
        saveEvent(EventNameEnum.BLUR, { screen: document.title });
      }
    });

    return () => {
      window.removeEventListener(EventNameEnum.CLICK, () => {});
      window.removeEventListener(EventNameEnum.VIEW, () => {});
      window.removeEventListener(EventNameEnum.SEARCH, () => {});
      window.removeEventListener(EventNameEnum.START, () => {});
      window.removeEventListener(EventNameEnum.END, () => {});
      window.removeEventListener('blur', () => {});
      window.removeEventListener('focus', () => {});
    };
  }, []);
}
