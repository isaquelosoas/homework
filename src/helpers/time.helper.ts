export class TimeHelper {
  public static calculateTimeSpent(startTime: string, endTime: string) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end.getTime() - start.getTime();
    return diff / (1000 * 60 * 60);
  }

  public static calculateValueByAverageTime(
    averageTime: number,
    timeSpent: number,
    mutiplier: number = 0.5,
  ) {
    if (averageTime === 0) {
      return mutiplier * timeSpent;
    }
    return ((averageTime + timeSpent) / 2) * mutiplier;
  }
}
