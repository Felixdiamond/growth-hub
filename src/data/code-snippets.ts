import { CodeSnippet } from '@/types/code';

export const codeSnippets: CodeSnippet[] = [
  {
    slug: 'automatic-switch',
    title: 'Automatic Switch with LDR Sensor',
    description: 'An Arduino sketch that automatically controls a servo motor based on light levels detected by an LDR sensor, with buzzer feedback.',
    date: '2025-01-20',
    author: 'Shaun Sosi',
    tags: ['Servo', 'LDR', 'Sensor', 'Automation'],
    language: 'cpp',
    difficulty: 'Intermediate',
    code: `#include <Servo.h>

// Pin definitions and global variables
const int WAIT_TIME = 500;
const int LDR_PIN = A0;
const int SERVO_PIN = 6;
const int BUZZER_PIN = 8;

int ldrValue;
int servoPosition;
int mode = 2;  // Initial mode

Servo servo;

void setup() {
  // Initialize pins and serial communication
  servo.attach(SERVO_PIN);
  pinMode(LDR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Read light sensor value
  ldrValue = analogRead(LDR_PIN);
  Serial.println(ldrValue);

  // Check for high light level (mode 2 to 1)
  if (ldrValue >= 500 && mode == 2) {
    // Move servo and give feedback
    servo.write(500);
    delay(400);
    servo.write(90);
    
    // Buzzer feedback
    digitalWrite(BUZZER_PIN, HIGH);
    delay(WAIT_TIME);
    digitalWrite(BUZZER_PIN, LOW);
    
    mode = 1;
  }

  // Check for low light level (mode 1 to 2)
  if (ldrValue <= 400 && mode == 1) {
    // Move servo and give feedback
    servo.write(0);
    delay(400);
    servo.write(90);
    
    // Buzzer feedback
    digitalWrite(BUZZER_PIN, HIGH);
    delay(WAIT_TIME);
    digitalWrite(BUZZER_PIN, LOW);
    delay(WAIT_TIME);
    
    mode = 2;
  }
}`
  }
]; 