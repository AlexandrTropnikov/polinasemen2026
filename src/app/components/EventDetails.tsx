import { motion } from "motion/react";
import { Calendar, Clock, MapPin, Camera, Music, Utensils, AlarmClockCheck } from "lucide-react";
import { useState, useEffect } from "react";

export function EventDetails() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const details = [
    {
      icon: Calendar,
      title: "Дата",
      value: "31 июля 2026",
      description: "Пятница"
    },
    {
      icon: Clock,
      title: "Время",
      value: "17:00",
      description: "Банкет начнется вовремя"
    },
    {
      icon: MapPin,
      title: "Место",
      value: "Концерт-Холл «Кино»",
      description: " Ярославль, Волжская набережная 4"
    }
  ];

  const timeline = [
    { 
      time: "10:30", 
      event: "Регистрация брака", 
      description: ["Ярославский район, п. Красный Бор, ул. Васильковая, д. 1",
                    "Самый трогательный и важный момент, когда мы станем мужем и женой. Присутствие на этой части дня необязательно, ведь мы знаем, как трудно бывает спланировать утро в будни, но мы будем искренне рады видеть каждого, кто разделит с нами эти первые минуты создания нашей семьи."],
      icon: Calendar 
    },
    { 
      time: "11:30 – 16:30", 
      event: "Свободное время", 
      description: "Пока мы будем кружиться в свадебной фотосессии, у вас будет время отдохнуть и не спеша подготовиться к вечеру.",
      icon: Camera 
    },
    { 
      time: "16:30", 
      event: "Сбор гостей", 
      description: ["Концерт-Холл «Кино» (Волжская наб., 4, Ярославль)", 
                    "Вас с нетерпением будут ждать на праздничной локации. Это прекрасное время, чтобы познакомиться друг с другом, насладиться моментом и сделать первые памятные кадры в этот особенный для нас день."],
      icon: AlarmClockCheck
    },
    { 
      time: "17:00", 
      event: "Начало банкета", 
      description: "Время для самых искренних слов, улыбок, объятий и танцев. Начинается праздник, к которому мы так долго шли и который будем счастливы разделить с вами!",
      icon: Utensils  
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-4">Детали Праздника</h2>
          <p className="text-muted-foreground">Вся важная информация о событии</p>
        </motion.div>

        {/* Main Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {details.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <detail.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">{detail.title}</h3>
              <p className="mb-1">{detail.value}</p>
              <p className="text-sm text-muted-foreground">{detail.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Venue Image - адаптивное */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Изображение для ПК */}
          <img
            src="/images/12.png"
            alt="Место проведения"
            className="w-full h-96 object-cover hidden md:block"
          />
          {/* Изображение для мобильных */}
          <img
            src="/images/12.png"
            alt="Место проведения"
            className="w-full h-64 sm:h-80 object-cover block md:hidden"
          />
        </motion.div>

        {/* Timeline с описаниями */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-secondary/20 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-center mb-12">Программа Дня</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-card rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-muted-foreground text-sm mb-1">{item.time}</div>
                  <div className="mb-2">{item.event}</div>
                  {/* Рендеринг массива описаний с переносами строк */}
                  {Array.isArray(item.description) ? (
                    item.description.map((line, i) => (
                      <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-1">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}