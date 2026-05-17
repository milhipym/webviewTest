import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

export function fmtTime(iso: string): string {
  return format(parseISO(iso), "HH:mm");
}

export function fmtDateKorean(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "M월 d일 (EEE)", { locale: ko });
}

export function fmtDateFull(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "yyyy년 M월 d일 EEEE", { locale: ko });
}

export function fmtDateIso(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function fmtDuration(seconds: number): string {
  if (seconds < 60) return `${Math.floor(seconds)}초`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}분`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem ? `${h}시간 ${rem}분` : `${h}시간`;
}

export function fmtDurationHMS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function fmtDistanceShort(iso: string): string {
  return formatDistanceToNowStrict(parseISO(iso), { locale: ko });
}

export function ageInMonths(birthdate: string, at: Date = new Date()): number {
  const bd = parseISO(birthdate);
  const years = at.getFullYear() - bd.getFullYear();
  const months = at.getMonth() - bd.getMonth();
  const days = at.getDate() - bd.getDate();
  return years * 12 + months + (days < 0 ? -1 : 0) + (days < 0 ? (days + 30) / 30 : days / 30);
}

export function ageLabel(birthdate: string, at: Date = new Date()): string {
  const bd = parseISO(birthdate);
  const totalDays = Math.floor((at.getTime() - bd.getTime()) / 86400000);
  if (totalDays < 30) return `생후 ${totalDays}일`;
  const months = Math.floor(totalDays / 30);
  const remDays = totalDays - months * 30;
  if (months < 12) return remDays ? `${months}개월 ${remDays}일` : `${months}개월`;
  const years = Math.floor(months / 12);
  const remMonths = months - years * 12;
  return remMonths ? `${years}살 ${remMonths}개월` : `${years}살`;
}
