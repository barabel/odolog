import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { closeAllSheets, closeSheet, useSheetStore } from './store';

export const useHistoryDismiss = () => {
  const location = useLocation();

  const prevOpenCountRef = useRef(0);
  const prevPathnameRef = useRef(location.pathname);
  const suppressHistoryBackRef = useRef(false);
  const selfInitiatedPopRef = useRef(false);

  useEffect(() => {
    const unsubscribe = useSheetStore.subscribe((state) => {
      const openCount = state.frames.filter(frame => frame.open).length;
      const prevOpenCount = prevOpenCountRef.current;

      if (openCount > prevOpenCount) {
        for (let i = prevOpenCount; i < openCount; i += 1) {
          window.history.pushState({ bottomSheet: true }, '');
        }
      }
      else if (openCount < prevOpenCount) {
        if (suppressHistoryBackRef.current) {
          suppressHistoryBackRef.current = false;
        }
        else {
          selfInitiatedPopRef.current = true;
          window.history.back();
        }
      }

      prevOpenCountRef.current = openCount;
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (selfInitiatedPopRef.current) {
        selfInitiatedPopRef.current = false;
        return;
      }

      const { frames } = useSheetStore.getState();

      if (frames.some(frame => frame.open)) {
        suppressHistoryBackRef.current = true;
        closeSheet();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (prevPathnameRef.current === location.pathname) {
      return;
    }

    prevPathnameRef.current = location.pathname;

    const { frames } = useSheetStore.getState();

    if (frames.some(frame => frame.open)) {
      suppressHistoryBackRef.current = true;
    }

    closeAllSheets();
  }, [location.pathname]);
};
