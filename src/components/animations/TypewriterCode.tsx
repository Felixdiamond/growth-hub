'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterCodeProps {
  code: string;
  speed?: number;
}

export default function TypewriterCode({ code, speed = 50 }: TypewriterCodeProps) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const codeRef = useRef<HTMLPreElement>(null);

  // Split code into tokens for syntax highlighting
  const tokenize = (text: string) => {
    // Keywords in Arduino
    const keywords = ['void', 'setup', 'loop', 'pinMode', 'digitalWrite', 'delay', 'OUTPUT', 'HIGH', 'LOW', 'LED_BUILTIN'];
    const numbers = /\b\d+\b/g;
    const functions = /\b(setup|loop|pinMode|digitalWrite|delay)\b(?=\s*\()/g;
    const comments = /\/\/.*/g;
    const strings = /"[^"]*"/g;

    let highlightedText = text;
    
    // Highlight strings first (to avoid conflicts)
    highlightedText = highlightedText.replace(strings, match => 
      `<span class="text-green-300">${match}</span>`
    );

    // Highlight comments
    highlightedText = highlightedText.replace(comments, match => 
      `<span class="text-dark-300">${match}</span>`
    );

    // Highlight numbers
    highlightedText = highlightedText.replace(numbers, match => 
      `<span class="text-accent-300">${match}</span>`
    );

    // Highlight functions
    highlightedText = highlightedText.replace(functions, match => 
      `<span class="text-blue-400">${match}</span>`
    );

    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlightedText = highlightedText.replace(regex, match => 
        `<span class="text-purple-400">${match}</span>`
      );
    });

    return highlightedText;
  };

  // Calculate cursor position based on text content
  const updateCursorPosition = (text: string) => {
    if (!codeRef.current) return;

    const lines = text.split('\n');
    const lastLine = lines[lines.length - 1];
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.style.font = window.getComputedStyle(codeRef.current).font;
    tempSpan.textContent = lastLine;
    document.body.appendChild(tempSpan);

    const width = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);

    const lineHeight = parseInt(window.getComputedStyle(codeRef.current).lineHeight);
    const y = (lines.length - 1) * lineHeight;

    setCursorPosition({ x: width, y });
  };

  // Natural typing variations
  const getRandomDelay = () => {
    const variations = [
      speed * 0.5,  // Fast typing
      speed * 1,    // Normal speed
      speed * 1.5,  // Slight pause
      speed * 2,    // Longer pause
      speed * 0.7,  // Quick but not too fast
    ];
    // Higher chance of normal speed
    const weights = [0.2, 0.4, 0.2, 0.1, 0.1];
    const random = Math.random();
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random < sum) return variations[i];
    }
    return speed;
  };

  useEffect(() => {
    let currentIndex = 0;
    const finalLength = code.length;
    let timeout: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (currentIndex < finalLength) {
        const nextChar = code[currentIndex];
        const newText = code.slice(0, currentIndex + 1);
        setDisplayedCode(newText);
        updateCursorPosition(newText);
        currentIndex++;

        // Add extra delay for new lines and special characters
        let nextDelay = getRandomDelay();
        if (nextChar === '\n') nextDelay *= 2;
        if (nextChar === '{' || nextChar === '}') nextDelay *= 1.5;
        if (nextChar === '(' || nextChar === ')') nextDelay *= 1.2;

        timeout = setTimeout(typeNextCharacter, nextDelay);
      } else {
        setIsTypingComplete(true);
      }
    };

    timeout = setTimeout(typeNextCharacter, speed);
    return () => clearTimeout(timeout);
  }, [code, speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-mono text-sm relative"
    >
      <pre ref={codeRef} className="text-dark-100 relative">
        <code 
          dangerouslySetInnerHTML={{ 
            __html: tokenize(displayedCode)
          }} 
        />
        {!isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute w-[1px] h-[1.2em] bg-accent-400"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: 'translateY(-0.1em)'
            }}
          />
        )}
      </pre>
    </motion.div>
  );
} 