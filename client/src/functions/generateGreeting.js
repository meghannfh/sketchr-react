const generateGreeting = () => {
    let greeting;
    const now = new Date();
    
    const morningGreetings = [
      'おはようございます',
      '잘 주무셨어요?',
      'buenos días',
      '早上好',
      'bom dia',
      'God morgon',
      'สวัสดีตอนเช้า',
      'सुप्रभात',
      'صباح الخير',
      'bonjour',
      'С добрым утром',
      'Chúc ngủ ngon',
      'Magandang umaga',
      'goeie more',
    ];

    const afternoonGreetings = [
      'こんにちは',
      '안녕',
      'hola',
      '你好',
      'olá',
      'hej',
      'สวัสดี',
      'नमस्ते',
      'السلام عليكم',
      'Привет',
    ];

    const randomMorningGreeting = afternoonGreetings[Math.floor(Math.random() * afternoonGreetings.length)];
    const randomAfternoonGreeting = morningGreetings[Math.floor(Math.random() * morningGreetings.length)];

    greeting = now.getHours() > 12 ? randomAfternoonGreeting : randomMorningGreeting;

    return greeting;
  };
  
  export default generateGreeting;