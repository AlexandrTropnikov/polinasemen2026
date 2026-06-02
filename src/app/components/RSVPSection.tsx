import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CheckCircle2, XCircle, PartyPopper, Heart } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxj-s9Kj4m3uL7C6rl0hk-Cg9p_W5ihDp-EaH7OT2D8-PM6HWleOKxC1H7IroKtbPdD/exec";

export function RSVPSection() {
  const [formData, setFormData] = useState({
    guestsCount: "1",
    guests: [""],
    attending: "yes",
    dietary: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attending: formData.attending,
          guestsCount: formData.guestsCount,
          guests: formData.guests.filter(g => g.trim() !== ""),
          dietary: formData.dietary,
          message: formData.message
        })
      });
      
      console.log("RSVP submitted:", formData);
      setSubmitted(true);
      
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGuestsCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    const newGuests = [...formData.guests];
    
    while (newGuests.length < count) {
      newGuests.push("");
    }
    while (newGuests.length > count) {
      newGuests.pop();
    }
    
    setFormData({
      ...formData,
      guestsCount: e.target.value,
      guests: newGuests
    });
  };

  const handleGuestNameChange = (index: number, value: string) => {
    const newGuests = [...formData.guests];
    newGuests[index] = value;
    setFormData({
      ...formData,
      guests: newGuests
    });
  };

  if (submitted) {
    const isAttending = formData.attending === "yes";
    const guestsList = formData.guests.filter(g => g.trim() !== "");
    
    return (
      <section id="rsvp" className="py-24 px-4 bg-secondary/20">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isAttending ? "attending" : "not-attending"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className={`p-8 rounded-2xl ${
                isAttending 
                  ? "bg-green-50 border-2 border-green-200" 
                  : "bg-amber-50 border-2 border-amber-200"
              }`}
            >
              {isAttending ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <PartyPopper className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h2 className="text-4xl font-serif mb-4 text-green-800">
                    Отлично{guestsList.length > 0 && `, ${guestsList[0]}`}!
                  </h2>
                  <p className="text-green-700 mb-3 text-lg">
                    Мы очень рады, что вы разделите с нами этот особенный день!
                  </p>
                  {guestsList.length > 0 && (
                    <div className="text-green-600 mb-2">
                      <p className="mb-1">Ждём на празднике:</p>
                      {guestsList.map((guest, index) => (
                        <p key={index} className="text-green-700">
                          {guest}
                        </p>
                      ))}
                    </div>
                  )}
                  {formData.dietary && (
                    <p className="text-green-600 mb-4 text-sm">
                      Мы учтём ваши пожелания по питанию
                    </p>
                  )}
                  <Heart className="w-8 h-8 text-red-400 mx-auto mt-4 animate-pulse" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <XCircle className="w-20 h-20 text-amber-500 mx-auto mb-6" />
                  <h2 className="text-4xl font-serif mb-4 text-amber-800">
                    Спасибо за ответ{guestsList.length > 0 && `, ${guestsList[0]}`}!
                  </h2>
                  <p className="text-amber-700 mb-3">
                    Нам очень жаль, что вы не сможете присутствовать.
                  </p>
                  {guestsList.length > 0 && (
                    <div className="text-amber-600 mb-2">
                      <p className="mb-1">Не смогут прийти:</p>
                      {guestsList.map((guest, index) => (
                        <p key={index} className="text-amber-700">
                          {guest}
                        </p>
                      ))}
                    </div>
                  )}
                  <p className="text-amber-600 mb-4">
                    Мы обязательно поделимся фотографиями и видео, 
                    чтобы вы тоже могли почувствовать атмосферу праздника!
                  </p>
                  {formData.message && (
                    <p className="text-amber-800 italic mt-4 p-4 bg-amber-100 rounded-lg">
                      "Спасибо за тёплые слова!"
                    </p>
                  )}
                </motion.div>
              )}
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => setSubmitted(false)}
                className={`mt-8 px-6 py-2 rounded-lg transition-colors ${
                  isAttending
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-amber-600 text-white hover:bg-amber-700"
                }`}
              >
                Изменить ответ
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-serif mb-4">Подтвердите Присутствие</h2>
          <p className="text-muted-foreground">
            Пожалуйста, сообщите нам, будете ли вы с нами до 1 июля 2026
          </p>
        </motion.div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.
          </div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card p-8 rounded-2xl shadow-lg border border-border"
        >
          <div className="space-y-6">
            {/* Attending */}
            <div>
              <label className="block mb-2">Планируете присутствовать? *</label>
              <select
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="yes">Да, с удовольствием!</option>
                <option value="no">К сожалению, не смогу</option>
              </select>
            </div>

            {/* Количество гостей и поля для имен - теперь всегда показываются */}
            <div>
              <label className="block mb-2">
                {formData.attending === "yes" 
                  ? "Количество гостей (включая вас) *" 
                  : "Кто не сможет прийти? *"}
              </label>
              <select
                name="guestsCount"
                value={formData.guestsCount}
                onChange={handleGuestsCountChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="1">1 человек</option>
                <option value="2">2 человека</option>
                <option value="3">3 человека</option>
                <option value="4">4 человека</option>
                <option value="5">5 человек</option>
              </select>
            </div>

            {/* Поля для имен гостей - всегда показываются */}
            <div className="space-y-4">
              <label className="block mb-2">
                {formData.attending === "yes" ? "Имена гостей *" : "Имена *"}
              </label>
              {formData.guests.map((guest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    value={guest}
                    onChange={(e) => handleGuestNameChange(index, e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={formData.attending === "yes" ? `Гость ${index + 1}` : `Имя ${index + 1}`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Dietary - только для присутствующих */}
            {formData.attending === "yes" && (
              <div>
                <label className="block mb-2">Пищевые ограничения</label>
                <input
                  type="text"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Вегетарианство, аллергии и т.д."
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block mb-2">Пожелания молодоженам</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Ваше сообщение..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}