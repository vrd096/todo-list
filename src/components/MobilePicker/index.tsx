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
import range from 'lodash/range';

const MobilePicker = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [dates, setDates] = useState(() => {
    const startDate = new Date();
    const endDate = addMonths(startDate, 3);
    return eachDayOfInterval({ start: startDate, end: endDate });
  });
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
  return (
    <div className={styles.picker}>
      <div className={styles.pickerTitle}>
        {/* {date.day}/{date.month}/{date.year}|{date.hour}:{date.minute} */}
      </div>
      <div className={styles.pickerWrapper}>
        <div className={classNames(styles.pickerWheels, styles.pickerDate)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            // initialSlide={date.day - 1}
            slidesPerView={5}
            loop={false}
            onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
            className="mySwiper">
            {dates.map((date) => (
              <SwiperSlide key={date.toISOString()}>
                {/* Отображение даты внутри слайда */}
                {format(date, 'EEEEEE, d MMM yyyy', { locale: ruLocale })}
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
        {/* <div className={classNames(styles.pickerWheels, styles.pickerHour)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={date.hour}
            slidesPerView={5}
            loop={true}
            onSlideChange={(swiper) => {
              // Update the date when the current slide changes
              setDate((prevDate) => ({
                ...prevDate,
                hour: swiper.realIndex,
              }));
            }}
            className="mySwiper">
            {hours.map((hour) => (
              <SwiperSlide key={hour}>{hour}</SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={classNames(styles.pickerWheels, styles.pickerMinute)}>
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={date.minute}
            slidesPerView={5}
            loop={true}
            onSlideChange={(swiper) => {
              setDate((prevDate) => ({
                ...prevDate,
                minute: swiper.realIndex,
              }));
            }}
            className="mySwiper">
            {minutes.map((minute) => (
              <SwiperSlide key={minute}>{minute}</SwiperSlide>
            ))}
          </Swiper>
        </div> */}
      </div>
    </div>
  );
};

export default MobilePicker;
