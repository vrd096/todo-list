import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import '../../scss/swiper/swiper-bundle.css';
import {
  add,
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import styles from './MobilePicker.module.scss';
import './swiper.css';
import classNames from 'classnames';

const MobilePicker = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [dates, setDates] = useState(() => {
    const startDate = new Date();
    const endDate = addMonths(startDate, 3);
    return eachDayOfInterval({ start: startDate, end: endDate });
  });
  const now = new Date();
  const [currentHourIndex, setCurrentHourIndex] = useState(now.getHours());
  const [currentMinuteIndex, setCurrentMinuteIndex] = useState(now.getMinutes());
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

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
      setDates(dates.concat(newDates));
    }
  }, [currentSlideIndex, dates]);
  console.log(dates);
  return (
    <div className={styles.picker}>
      <div className={styles.pickerTitle}>
        {format(dates[currentSlideIndex], 'd/MM/yyyy', { locale: ruLocale })}{' '}
        {currentHourIndex.toString().padStart(2, '0')}:
        {currentMinuteIndex.toString().padStart(2, '0')}
      </div>

      <div className={styles.pickerWrapper}>
        <div className={classNames(styles.pickerWheels, styles.pickerDate)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            // initialSlide={date.day - 1}
            slidesPerView={3}
            loop={false}
            onSlideChange={(swiper) => setCurrentSlideIndex(swiper.realIndex)}
            className={styles.pickerSwiper}>
            {dates.map((date) => (
              <SwiperSlide key={date.toISOString()}>
                {/* Отображение даты внутри слайда */}
                {format(date, 'EEEEEE, d MMM', { locale: ruLocale })}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className={classNames(styles.pickerWheels, styles.pickerMonth)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={date.month - 1}
            slidesPerView={5}
            loop={true}
            onSlideChange={(swiper) => {
              setDate((prevDate) => ({
                ...prevDate,
                month: swiper.realIndex + 1,
              }));
            }}
            className="mySwiper">
            {months.map((month, index) => (
              <SwiperSlide key={index}>{month}</SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={classNames(styles.pickerWheels, styles.pickerYear)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={years.indexOf(date.year)}
            slidesPerView={5}
            loop={true}
            onSlideChange={(swiper) => {
              setDate((prevDate) => ({
                ...prevDate,
                year: years[swiper.realIndex],
              }));
            }}
            className="mySwiper">
            {years.map((year) => (
              <SwiperSlide key={year}>{year}</SwiperSlide>
            ))}
          </Swiper>
        </div> */}
        <div className={classNames(styles.pickerWheels, styles.pickerTime)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={now.getHours()}
            slidesPerView={3}
            loop={true}
            onSlideChange={(swiper) => setCurrentHourIndex(swiper.realIndex)}
            className={styles.pickerSwiper}>
            {hours.map((hour) => (
              <SwiperSlide key={hour}>
                {/* Отображение часа внутри слайда */}
                {hour}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.pickerTimeColon}>:</div>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={now.getMinutes()}
            slidesPerView={3}
            loop={true}
            onSlideChange={(swiper) => setCurrentMinuteIndex(swiper.realIndex)}
            className={styles.pickerSwiper}>
            {minutes.map((minute) => (
              <SwiperSlide key={minute}>
                {/* Отображение минуты внутри слайда */}
                {minute}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MobilePicker;
