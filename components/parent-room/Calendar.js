/**
 * The date and time picker.
 *
 * Driven entirely by what `/api/parent-room/availability` returns: a date with
 * no selectable times is simply not in the list, so the calendar can never
 * offer a slot the booking transaction would reject. There is no hardcoded
 * 10:00–13:00 anywhere in this file.
 *
 * On a phone the month grid and the times stack; from `md` up they sit side by
 * side, so a parent on a laptop sees both at once the way a scheduling tool
 * should behave.
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { formatDateKey, monthGrid, monthName, weekdayShort } from '@/lib/parentRoomTime';

const WEEKDAY_INITIALS = [0, 1, 2, 3, 4, 5, 6].map((index) => weekdayShort(index).slice(0, 1));

export default function Calendar({ days = [], months = [], value, onSelect, loading }) {
  const reduce = useReducedMotion();

  /** dateKey → the day's selectable slots. */
  const byDate = useMemo(() => {
    const map = new Map();
    days.forEach((day) => map.set(day.dateKey, day));
    return map;
  }, [days]);

  const firstOpenDate = days[0]?.dateKey || '';
  const [monthIndex, setMonthIndex] = useState(0);
  const [activeDate, setActiveDate] = useState(firstOpenDate);

  // Open on the first date that actually has room, and follow the availability
  // if it reloads underneath us (another parent has just taken the last slot).
  useEffect(() => {
    if (!firstOpenDate) return;
    setActiveDate((current) => (current && byDate.has(current) ? current : firstOpenDate));
  }, [firstOpenDate, byDate]);

  useEffect(() => {
    if (!activeDate || months.length === 0) return;
    const key = activeDate.slice(0, 7);
    const index = months.findIndex((month) => month.key === key);
    if (index >= 0) setMonthIndex(index);
  }, [activeDate, months]);

  const month = months[monthIndex];
  const cells = month ? monthGrid(month.year, month.month) : [];
  const activeDay = byDate.get(activeDate);

  if (loading) {
    return (
      <div className="border border-hairline bg-white p-6">
        <div className="h-5 w-40 animate-pulse bg-stone" />
        <div className="mt-6 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 35 }).map((_, index) => (
            <div key={index} className="aspect-square animate-pulse bg-stone/70" />
          ))}
        </div>
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="border border-hairline bg-white p-8 text-center">
        <p className="font-display text-xl text-ink">No times are open just now.</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
          Every session in the current window has been taken. Please check back in a day or two —
          new times are opened regularly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-0 border border-hairline bg-white md:grid-cols-[1fr_15rem]">
      {/* ---------------------------------------------------------- month grid */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-[1.35rem] font-medium text-ink">
            {month ? `${monthName(month.month - 1)} ${month.year}` : ''}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
              disabled={monthIndex === 0}
              aria-label="Previous month"
              className="flex h-10 w-10 items-center justify-center border border-hairline text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
              disabled={monthIndex >= months.length - 1}
              aria-label="Next month"
              className="flex h-10 w-10 items-center justify-center border border-hairline text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1.5">
          {WEEKDAY_INITIALS.map((initial, index) => (
            <div
              key={`${initial}-${index}`}
              aria-hidden="true"
              className="pb-1 text-center text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink-muted"
            >
              {initial}
            </div>
          ))}

          {cells.map((dateKey, index) => {
            if (!dateKey) return <div key={`pad-${index}`} />;
            const open = byDate.has(dateKey);
            const selected = dateKey === activeDate;
            const dayNumber = Number(dateKey.slice(-2));

            return (
              <button
                key={dateKey}
                type="button"
                disabled={!open}
                onClick={() => setActiveDate(dateKey)}
                aria-pressed={selected}
                aria-label={`${formatDateKey(dateKey)}${open ? '' : ' — no sessions'}`}
                className={`relative flex aspect-square items-center justify-center border text-[0.95rem] tabular-nums transition-colors duration-200 ${
                  selected
                    ? 'border-crimson bg-crimson font-bold text-white'
                    : open
                      ? 'border-hairline bg-white font-semibold text-ink hover:border-ink'
                      : 'cursor-not-allowed border-transparent bg-transparent text-ink-muted/40'
                }`}
              >
                {dayNumber}
                {open && !selected && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1.5 h-1 w-1 rounded-full bg-crimson"
                  />
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-5 flex items-center gap-2 text-[0.75rem] text-ink-muted">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crimson" />
          Dates with sessions available. All times shown are India Standard Time.
        </p>
      </div>

      {/* --------------------------------------------------------------- times */}
      <div className="border-t border-hairline bg-ivory p-5 sm:p-6 md:border-l md:border-t-0">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-muted">
          {activeDate ? formatDateKey(activeDate, { short: true }) : 'Pick a date'}
        </p>

        <div className="mt-4 flex max-h-[19rem] flex-col gap-2 overflow-y-auto md:max-h-[24rem]">
          {(activeDay?.slots || []).map((slot, index) => {
            const selected = value === slot.slotId;
            const Tile = reduce ? 'button' : motion.button;
            const animation = reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.35, delay: Math.min(index, 8) * 0.03, ease: [0.22, 1, 0.36, 1] }
                };

            return (
              <Tile
                key={slot.slotId}
                type="button"
                // The availability payload keys slots by day, so the date is
                // carried back with the pick rather than re-derived downstream.
                onClick={() => onSelect({ ...slot, dateKey: activeDate })}
                aria-pressed={selected}
                {...animation}
                className={`w-full border px-4 py-3.5 text-[0.95rem] font-bold tabular-nums transition-colors duration-200 ${
                  selected
                    ? 'border-crimson bg-crimson text-white'
                    : 'border-hairline bg-white text-ink hover:border-ink'
                }`}
              >
                {slot.label}
              </Tile>
            );
          })}

          {activeDay && activeDay.slots.length === 0 && (
            <p className="text-[0.9rem] leading-relaxed text-ink-soft">
              Nothing left on this date. Please choose another.
            </p>
          )}
        </div>

        {activeDay?.remaining ? (
          <p className="mt-4 border-t border-hairline pt-3 text-[0.75rem] text-ink-muted">
            {activeDay.remaining === 1
              ? 'One session left on this date.'
              : `${activeDay.remaining} sessions left on this date.`}
          </p>
        ) : null}
      </div>
    </div>
  );
}
