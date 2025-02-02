import type { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    slug: 'ep1-getting-started-with-arduino',
    title: 'How to Get Started with Learning Arduino',
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
    title: 'Everything you need to know about the Breadboard and Sketch',
    description: 'Master the fundamentals of using a breadboard for circuit prototyping and learn how to write your first Arduino sketches.',
    date: '2024-10-31',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'Programming'],
    episode: 2,
    image: '/images/blog/ep2img1.jpg',
    excerpt: 'Master the fundamentals of using a breadboard for circuit prototyping and learn how to write your first Arduino sketches.'
  },
  {
    slug: 'ep3-wiring-best-practices',
    title: 'Best Practices for Arduino Circuit Wiring',
    description: 'Learn essential tips and techniques for clean, reliable circuit wiring with your Arduino projects, including color-coding and connection testing.',
    date: '2024-11-01',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'Best Practices'],
    episode: 3,
    image: '/images/blog/ep3img1.jpg',
    excerpt: 'Learn essential tips and techniques for clean, reliable circuit wiring with your Arduino projects, including color-coding and connection testing.'
  },
  {
    slug: 'ep4-led-blink-code',
    title: 'Arduino Basics: Make an LED Blink with Code',
    description: 'Learn how to write your first Arduino program to control an LED, understanding essential programming concepts like pinMode, digitalWrite, and delay functions.',
    date: '2024-11-02',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects'],
    episode: 4,
    image: '/images/blog/ep4img1.jpg',
    excerpt: 'Write your first Arduino program to make an LED blink while learning fundamental programming concepts and functions.'
  },
  {
    slug: 'ep5-master-led-programming',
    title: 'Master Programming LEDs with an Arduino',
    description: 'Take your LED programming skills to the next level by creating advanced blinking patterns and understanding timing control in Arduino sketches.',
    date: '2024-11-03',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects'],
    episode: 5,
    image: '/images/blog/ep5img1.jpg',
    excerpt: 'Learn advanced LED programming techniques with Arduino, including custom blinking patterns and precise timing control.'
  },
  {
    slug: 'ep6-serial-monitor-guide',
    title: 'How to Use the Serial Monitor',
    description: 'Learn how to communicate with your Arduino using the Serial Monitor, understand baud rates, and master different ways to send and receive data.',
    date: '2024-11-04',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'Debugging'],
    episode: 6,
    image: '/images/blog/ep6img1.jpg',
    excerpt: 'Master the Serial Monitor to communicate with your Arduino, debug your code, and understand data transmission concepts.'
  },
  {
    slug: 'ep7-arduino-variables',
    title: 'Learning to Use Variables in your Arduino Program',
    description: 'Master the fundamentals of variables in Arduino programming, including different data types like integers, strings, and floats, to write more efficient and organized code.',
    date: '2024-11-05',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'Variables'],
    episode: 7,
    image: '/images/blog/ep7img1.jpg',
    excerpt: 'Learn how to use variables effectively in your Arduino programs to store and manipulate different types of data.'
  },
  {
    slug: 'ep8-voltage-current-resistance',
    title: 'Voltage, Current and Resistance',
    description: 'Learn the fundamental concepts of electronics: voltage, current, and resistance. Understand how these elements work together through Ohm\'s Law and practical analogies.',
    date: '2024-11-06',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'Fundamentals'],
    episode: 8,
    image: '/images/blog/ep8img1.jpg',
    excerpt: 'Master the basic principles of electronics by understanding voltage, current, and resistance through simple analogies and Ohm\'s Law.'
  },
  {
    slug: 'ep9-led-dimming-analogwrite',
    title: 'How to Dim an LED with Arduino\'s analogWrite',
    description: 'Learn how to control LED brightness using PWM through Arduino\'s analogWrite function. Understand duty cycles, bit resolution, and how PWM simulates analog output.',
    date: '2024-11-07',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects', 'PWM'],
    episode: 9,
    image: '/images/blog/ep9img1.jpg',
    excerpt: 'Master LED dimming techniques using Arduino\'s analogWrite function and understand the principles of PWM (Pulse Width Modulation).'
  },
  {
    slug: 'ep10-analogread-basics',
    title: 'Understanding Arduino\'s analogRead Function for Beginners',
    description: 'Learn how to read analog signals with Arduino\'s analogRead function, understand voltage conversion, and master the basics of analog-to-digital conversion.',
    date: '2024-11-11',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'Analog Input'],
    episode: 10,
    image: '/images/blog/ep10img1.jpg',
    excerpt: 'Master analog input reading with Arduino\'s analogRead function, including voltage conversion formulas and practical applications.'
  },
  {
    slug: 'ep11-potentiometer-guide',
    title: 'How to Use Potentiometers in Arduino Projects',
    description: 'Learn how to integrate potentiometers into your Arduino projects for precise analog control. Understand voltage dividers and implement practical applications.',
    date: '2024-11-12',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'Analog Input'],
    episode: 11,
    image: '/images/blog/ep11img1.jpg',
    excerpt: 'Master the use of potentiometers in Arduino projects, from basic voltage control to advanced applications and practical implementations.'
  },
  {
    slug: 'ep12-led-potentiometer-dimming',
    title: 'How to Dim an LED using the Potentiometer',
    description: 'Learn how to combine potentiometers with LEDs to create smooth dimming effects. Master analog input processing and PWM output control in Arduino.',
    date: '2024-11-14',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'LED Projects', 'PWM'],
    episode: 12,
    image: '/images/blog/ep12img1.jpg',
    excerpt: 'Create smooth LED dimming effects using a potentiometer, combining analog input reading with PWM output control.'
  },
  {
    slug: 'ep13-map-function-guide',
    title: 'How to Use the map() function on the Arduino',
    description: 'Master Arduino\'s map() function to easily convert values between different ranges. Learn how to scale sensor inputs and create more intuitive outputs in your projects.',
    date: '2024-11-15',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'Functions'],
    episode: 13,
    image: '/images/blog/ep13img1.jpg',
    excerpt: 'Learn how to use Arduino\'s map() function to convert values between ranges, making your sensor readings and outputs more meaningful.'
  },
  {
    slug: 'ep14-rgb-led-guide',
    title: 'How Common Anode and Cathode RGB LEDs work',
    description: 'Master the differences between common anode and cathode RGB LEDs, learn proper wiring techniques, and create colorful Arduino projects.',
    date: '2024-11-19',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Electronics', 'LED Projects'],
    episode: 14,
    image: '/images/blog/ep14img1.jpg',
    excerpt: 'Understand the fundamentals of RGB LEDs, including common anode and cathode configurations, proper connections, and programming techniques.'
  },
  {
    slug: 'ep15-rgb-led-programming',
    title: 'How to easily program RGB LEDs',
    description: 'Learn how to program both common cathode and common anode RGB LEDs using digital and analog control methods to create stunning color effects.',
    date: '2024-11-26',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects', 'PWM'],
    episode: 15,
    image: '/images/blog/ep15img1.jpg',
    excerpt: 'Master RGB LED programming techniques using both digitalWrite and analogWrite to create vibrant color combinations and dynamic lighting effects.'
  },
  {
    slug: 'ep16-setcolor-function',
    title: 'How to program RGB LEDs with the setColor function',
    description: 'Master the powerful setColor function to create beautiful color combinations with RGB LEDs. Learn advanced color mixing techniques and create stunning light displays.',
    date: '2024-11-28',
    author: 'Shaun Sosi',
    tags: ['ARDUINO LESSONS', 'Programming', 'LED Projects', 'Functions'],
    episode: 16,
    image: '/images/blog/ep16img1.jpg',
    excerpt: 'Discover how to use the setColor function to simplify RGB LED control and create amazing color combinations with clean, maintainable code.'
  }
];