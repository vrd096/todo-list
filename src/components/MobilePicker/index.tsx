import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { addDays, addMonths, eachDayOfInterval, format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import classNames from 'classnames';
import styles from './MobilePicker.module.scss';
import './swiper.css';

interface MobilePickerProps {
  onChange: (date: Date) => void;
  closeCalendar: () => Promise<void>;
}

const MINUTES_INTERVAL = 15;
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const INITIAL_MINUTES = [0, 15, 30, 45, 0, 15, 30, 45];

const MobilePicker: React.FC<MobilePickerProps> = ({ onChange, closeCalendar }) => {
  const now = new Date();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentHourIndex, setCurrentHourIndex] = useState(now.getHours());
  const [currentMinuteIndex, setCurrentMinuteIndex] = useState(
    INITIAL_MINUTES.indexOf(now.getMinutes() - (now.getMinutes() % MINUTES_INTERVAL)),
  );

  const [dates, setDates] = useState(() => {
    const startDate = new Date();
    const endDate = addMonths(startDate, 3);
    return eachDayOfInterval({ start: startDate, end: endDate });
  });

  const formattedReturnDate = useMemo(() => {
    const newDate = new Date(dates[currentSlideIndex]);
    newDate.setHours(currentHourIndex);
    newDate.setMinutes(INITIAL_MINUTES[currentMinuteIndex % 4]);
    return newDate;
  }, [currentSlideIndex, currentHourIndex, currentMinuteIndex, dates]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (currentSlideIndex > dates.length - 31) {
      const newDates = eachDayOfInterval({
        start: addDays(dates[dates.length - 1], 1),
        end: addMonths(dates[dates.length - 1], 1),
      });
      setDates((prevDates) => [...prevDates, ...newDates]);
    }
  }, [currentSlideIndex, dates]);

  useEffect(() => {
    onChange(formattedReturnDate);
  }, [formattedReturnDate, onChange]);

  const handleButtonClickSave = async () => {
    await closeCalendar();
  };

  return (
    <div className={styles.picker}>
      <div className={styles.controlButton}>
        <button onClick={handleButtonClickSave}>Сохранить</button>
      </div>
      <div className={styles.pickerTitle}>
        {format(dates[currentSlideIndex], 'dd/MM/yyyy', { locale: ruLocale })}
        {currentHourIndex.toString().padStart(2, '0')}:
        {INITIAL_MINUTES[currentMinuteIndex].toString().padStart(2, '0')}
      </div>

      <div className={styles.pickerWrapper}>
        <div className={classNames(styles.pickerWheels, styles.pickerDate)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            slidesPerView={3}
            loop={false}
            onSlideChange={(swiper) => setCurrentSlideIndex(swiper.realIndex)}
            className={styles.pickerSwiper}>
            {dates.map((date) => (
              <SwiperSlide key={date.toISOString()}>
                {format(date, 'EEEEEE, d MMM', { locale: ruLocale })}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={classNames(styles.pickerWheels, styles.pickerTime)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={now.getHours()}
            slidesPerView={3}
            loop={true}
            onSlideChange={(swiper) => setCurrentHourIndex(swiper.realIndex)}
            className={styles.pickerSwiper}>
            {HOURS.map((hour) => (
              <SwiperSlide key={hour}>{hour.toString().padStart(2, '0')}</SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.pickerTimeColon}>:</div>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            loopedSlides={4}
            initialSlide={currentMinuteIndex}
            slidesPerView={3}
            loop={true}
            onSlideChange={(swiper) => setCurrentMinuteIndex(swiper.realIndex)}
            className={styles.pickerSwiper}>
            {INITIAL_MINUTES.map((minute, index) => (
              <SwiperSlide key={`${minute}-${index}`}>
                {minute.toString().padStart(2, '0')}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MobilePicker;
