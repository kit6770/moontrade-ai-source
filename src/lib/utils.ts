export function formatNumber(number: number): string {
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

export function timeAgo(time: string | Date): string {
  const now = new Date();
  const inputTime = new Date(time);
  const diffInSeconds = Math.floor((now.getTime() - inputTime.getTime()) / 1000); // 时间差（秒）
  
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
}

export function formatAddress(address: string | undefined, front?: number, back?: number) {
  return address ? `${address?.slice(0, front || 4)}...${address?.substring(address?.length - (back || 3))}` : '';
}