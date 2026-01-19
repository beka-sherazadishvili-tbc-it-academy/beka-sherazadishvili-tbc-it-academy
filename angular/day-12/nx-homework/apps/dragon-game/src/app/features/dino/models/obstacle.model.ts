export type ObstacleType = 'cactus' | 'bird';

export interface ActiveObstacle {
  id: number;
  type: ObstacleType;
  passed?: boolean;
}
