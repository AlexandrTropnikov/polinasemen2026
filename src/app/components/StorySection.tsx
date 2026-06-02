import { motion } from "motion/react";

export function StorySection() {
  const story = [
    {
      year: "Лето 2020",
      title: "Первая встреча",
      description: "Все началось в тихой деревне, вдали от суеты. Мы долго не решались признаться друг другу в самом важном, скрывая чувства за робкими взглядами. Но один случайный момент изменил всë... "
    },
    {
      year: "30 октября 2020",
      title: "Первое свидание",
      description: "Нас разделяли километры, и мы ценили каждую секунду. В тот день у нас был всего один час — час простой прогулки, ставший самым драгоценным временем. Эти мгновения окрылили нас, и именно тогда, шаг за шагом, начала строиться наша любовь."
    },
    {
      year: "9 января 2026",
      title: "Предложение",
      description: "«Это было спонтанно, несмотря на долгие годы ожидания. В какой-то момент я просто понял, что больше не могу и не хочу ждать. Настал тот самый миг, когда мысли превращаются в действия...»"
    },
    {
      year: "31 июля 2026",
      title: "Наша свадьба",
      description: "История, которая ковалась годами, привела нас к этому дню. Мы открываем новую, самую счастливую главу нашей жизни и будем бесконечно рады разделить начало этого пути вместе с вами!"
    }
  ];

  return (
    <section className="py-24 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-4">Наша история любви</h2>
          <p className="text-muted-foreground">Путь к счастью</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          {story.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} text-left`}>
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <div className="text-4xl font-serif mb-2 text-primary">{item.year}</div>
                  <h3 className="mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
