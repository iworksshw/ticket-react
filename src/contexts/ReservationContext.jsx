import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ReservationContext = createContext(null);

const STORAGE_KEY = 'arex.reservation';

function readStoredReservation() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { search: null, train: null };
  } catch {
    return { search: null, train: null };
  }
}

/**
 * 승차권 예약 흐름(검색 -> 열차선택 -> 예약완료) 동안 쓰이는 검색조건/선택열차 정보를
 * 앱 전역에서 공유하고 localStorage에 유지한다.
 * @param {ReactNode} children
 */
export function ReservationProvider({ children }) {
  const [reservation, setReservation] = useState(readStoredReservation);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservation));
  }, [reservation]);

  const setSearch = useCallback((search) => {
    setReservation((prev) => ({ ...prev, search }));
  }, []);

  const setTrain = useCallback((train) => {
    setReservation((prev) => ({ ...prev, train }));
  }, []);

  const clearReservation = useCallback(() => {
    setReservation({ search: null, train: null });
  }, []);

  const value = { ...reservation, setSearch, setTrain, clearReservation };

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
}

/**
 * @returns {{ search: object|null, train: object|null, setSearch: function, setTrain: function, clearReservation: function }}
 */
export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error('useReservation은 ReservationProvider 내부에서만 사용할 수 있습니다.');
  return ctx;
}
