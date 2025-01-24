export function formatNumber(number?: number): string {
  if (!number) return '';
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + 'B'; // (Billion)
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + 'M'; // (Million)
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + 'K'; // (Thousand)
  } else {
    return number.toString(); // 
  }
}

export function timeAgo(time?: string | Date, isLong?: boolean, isAgo?: boolean): string {
  if (!time) return '';
  const now = new Date();
  const inputTime = new Date(time);
  const diffInSeconds = Math.floor((now.getTime() - inputTime.getTime()) / 1000); // 时间差（秒）
  
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (minutes < 60) {
    return `${minutes} ${isLong? `min${minutes > 1 ? 's' : ''}` : 'm'} ${isAgo ? 'ago' : ''}`;
  } else if (hours < 24) {
    return `${hours} ${isLong ? `hour${hours > 1 ? 's' : ''}` : 'h'} ${isAgo ? 'ago' : ''}`;
  } else if (days < 30) {
    return `${days} ${isLong ? `day${days > 1 ? 's' : ''}` : 'd'} ${isAgo ? 'ago' : ''}`;
  } else {
    const months = Math.floor(days / 30);
    return `${months} ${isLong ? `month${months > 1 ? 's' : ''}` : '' } ${isAgo ? 'ago' : ''}`;
  }
}

export function formatAddress(address: string | undefined, front?: number, back?: number) {
  return address ? `${address?.slice(0, front || 4)}...${address?.substring(address?.length - (back || 3))}` : '';
}