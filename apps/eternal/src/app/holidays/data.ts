import { Holiday } from './holiday';

export const holidays: Holiday[] = [
  {
    id: 1,
    title: 'Angkor Wat',
    teaser: 'Discover forgotten temples',
    description: 'Angkor Wat in Cambodia',
    imageUrl: 'assets/AngkorWat.jpg',
    typeId: 1,
    durationInDays: 3,
    minCount: 5,
    maxCount: 12
  },
  {
    id: 2,
    title: 'China',
    teaser: 'China Highlights in 10 days',
    description: "Discover China's most famous highlights",
    imageUrl: 'assets/China.jpg',
    typeId: 1,
    durationInDays: 12,
    minCount: 8,
    maxCount: 15
  },
  {
    id: 3,
    title: 'Austrian Rush',
    teaser: 'From East to West, from North to South in just 6 days',
    description:
      'Get to know different aspects of Austria. Hike mountains in Tyrol, relax in Burgenland, enjoy the rich culture of Vienna, Salzburg, Graz or Innsbruck',
    imageUrl: 'assets/AustrianRush.jpg',
    typeId: 2,
    durationInDays: 14,
    minCount: 2,
    maxCount: 10
  }
];
