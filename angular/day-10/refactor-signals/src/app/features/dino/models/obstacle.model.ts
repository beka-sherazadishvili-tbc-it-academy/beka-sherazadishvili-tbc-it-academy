type ObstacleType = 'cactus' | 'bird';

interface ActiveObstacle {
  id: number;
  type: ObstacleType;
  passed?: boolean;
}
