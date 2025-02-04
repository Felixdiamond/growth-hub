import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    slug: 'ep1-getting-started-with-arduino',
    title: 'Getting Started with Arduino',
    description: 'Begin your journey into the world of Arduino with this comprehensive guide covering the basics of Arduino hardware, software, and programming concepts.',
    date: '2024-10-30',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Getting Started', 'Hardware'],
    episode: 1,
    image: '/images/blog/ep1img1.png',
    excerpt: 'Begin your journey into the world of Arduino with this comprehensive guide covering the basics of Arduino hardware, software, and programming concepts.'
  },
  {
    slug: 'ep2-breadboard-and-sketch',
    title: 'Understanding Breadboards and Sketches',
    description: 'Learn how to use breadboards for prototyping and write your first Arduino sketches.',
    date: '2024-11-06',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Hardware', 'Programming'],
    episode: 2,
    image: '/images/blog/ep2img1.png',
    excerpt: 'Master the fundamentals of using a breadboard for circuit prototyping and learn how to write your first Arduino sketches.'
  },
  {
    slug: 'ep3-wiring-best-practices',
    title: 'Wiring Best Practices',
    description: 'Learn essential tips and techniques for clean, reliable circuit wiring.',
    date: '2024-11-13',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Hardware', 'Best Practices'],
    episode: 3,
    image: '/images/blog/ep3img1.png',
    excerpt: 'Learn essential tips and techniques for clean, reliable circuit wiring with your Arduino projects, including color-coding and connection testing.'
  },
  {
    slug: 'ep4-led-blink-code',
    title: 'Your First LED Blink',
    description: 'Create your first Arduino program to make an LED blink.',
    date: '2024-11-20',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects'],
    episode: 4,
    image: '/images/blog/ep4img1.png',
    excerpt: 'Learn how to write your first Arduino program to control an LED, understanding essential programming concepts like pinMode, digitalWrite, and delay functions.'
  },
  {
    slug: 'ep5-master-led-programming',
    title: 'Master LED Programming',
    description: 'Take your LED programming skills to the next level with advanced patterns.',
    date: '2024-11-27',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects'],
    episode: 5,
    image: '/images/blog/ep5img1.png',
    excerpt: 'Take your LED programming skills to the next level by creating advanced blinking patterns and understanding timing control in Arduino sketches.'
  },
  {
    slug: 'ep6-serial-monitor-guide',
    title: 'Using the Serial Monitor',
    description: 'Master the Serial Monitor for debugging and communication.',
    date: '2024-12-04',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'Debugging'],
    episode: 6,
    image: '/images/blog/ep6img1.png',
    excerpt: 'Master the Serial Monitor to communicate with your Arduino, debug your code, and understand data transmission concepts.'
  },
  {
    slug: 'ep7-arduino-variables',
    title: 'Understanding Arduino Variables',
    description: 'Learn about different variable types and how to use them effectively.',
    date: '2024-12-11',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'Variables'],
    episode: 7,
    image: '/images/blog/ep7img1.png',
    excerpt: 'Master the fundamentals of variables in Arduino programming, including different data types like integers, strings, and floats, to write more efficient and organized code.'
  },
  {
    slug: 'ep8-voltage-current-resistance',
    title: 'Voltage, Current, and Resistance',
    description: 'Understand the fundamental concepts of electronics.',
    date: '2024-12-18',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'Fundamentals'],
    episode: 8,
    image: '/images/blog/ep8img1.png',
    excerpt: 'Master the basic principles of electronics by understanding voltage, current, and resistance through simple analogies and Ohm\'s Law.'
  },
  {
    slug: 'ep9-led-dimming-analogwrite',
    title: 'LED Dimming with analogWrite',
    description: 'Learn how to control LED brightness using PWM.',
    date: '2024-12-25',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects', 'PWM'],
    episode: 9,
    image: '/images/blog/ep9img1.png',
    excerpt: 'Master LED dimming techniques using Arduino\'s analogWrite function and understand the principles of PWM (Pulse Width Modulation).'
  },
  {
    slug: 'ep10-analogread-basics',
    title: 'Understanding analogRead',
    description: 'Learn how to read analog signals with Arduino.',
    date: '2025-01-01',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'Analog Input'],
    episode: 10,
    image: '/images/blog/ep10img1.png',
    excerpt: 'Master analog input reading with Arduino\'s analogRead function, including voltage conversion formulas and practical applications.'
  },
  {
    slug: 'ep11-potentiometer-guide',
    title: 'Using Potentiometers',
    description: 'Learn how to integrate potentiometers into your Arduino projects for precise analog control.',
    date: '2024-11-12',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'Analog Input'],
    episode: 11,
    image: '/images/blog/ep11img1.jpg',
    excerpt: 'Master the use of potentiometers in Arduino projects, from basic voltage control to advanced applications and practical implementations.'
  },
  {
    slug: 'ep12-led-potentiometer-dimming',
    title: 'LED Dimming with Potentiometers',
    description: 'Learn how to combine potentiometers with LEDs to create smooth dimming effects.',
    date: '2024-11-14',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'LED Projects', 'PWM'],
    episode: 12,
    image: '/images/blog/ep12img1.jpg',
    excerpt: 'Create smooth LED dimming effects using a potentiometer, combining analog input reading with PWM output control.'
  },
  {
    slug: 'ep13-map-function-guide',
    title: 'Using the map() Function',
    description: 'Master Arduino\'s map() function to easily convert values between different ranges.',
    date: '2024-11-15',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'Functions'],
    episode: 13,
    image: '/images/blog/ep13img1.jpg',
    excerpt: 'Learn how to use Arduino\'s map() function to convert values between ranges, making your sensor readings and outputs more meaningful.'
  },
  {
    slug: 'ep14-rgb-led-guide',
    title: 'Understanding RGB LEDs',
    description: 'Master the differences between common anode and cathode RGB LEDs.',
    date: '2024-11-19',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'LED Projects'],
    episode: 14,
    image: '/images/blog/ep14img1.jpg',
    excerpt: 'Understand the fundamentals of RGB LEDs, including common anode and cathode configurations, proper connections, and programming techniques.'
  },
  {
    slug: 'ep15-rgb-led-programming',
    title: 'Programming RGB LEDs',
    description: 'Learn how to program both common cathode and common anode RGB LEDs.',
    date: '2024-11-26',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects', 'PWM'],
    episode: 15,
    image: '/images/blog/ep15img1.jpg',
    excerpt: 'Master RGB LED programming techniques using both digitalWrite and analogWrite to create vibrant color combinations and dynamic lighting effects.'
  },
  {
    slug: 'ep16-setcolor-function',
    title: 'The setColor Function for RGB LEDs',
    description: 'Master the powerful setColor function to create beautiful color combinations.',
    date: '2024-11-28',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects', 'Functions'],
    episode: 16,
    image: '/images/blog/ep16img1.jpg',
    excerpt: 'Discover how to use the setColor function to simplify RGB LED control and create amazing color combinations with clean, maintainable code.'
  }
];