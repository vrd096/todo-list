import { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import '../../scss/swiper/swiper-bundle.css';
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
import ru from 'date-fns/locale/ru';
import styles from './MobilePicker.module.scss';
import './swiper.css';
import classNames from 'classnames';
import range from 'lodash/range';

const MobilePicker = () => {
  const now = new Date();
  const [date, setDate] = useState({
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    hour: now.getHours(),
    minute: now.getMinutes(),
  });
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const years = range(1900, 2101);
  const hours = range(0, 24);
  const minutes = range(0, 60);
  console.log(new Date(date.year, date.month - 1, date.day, date.hour, date.minute));
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    setDays(
      eachDayOfInterval({
        start: startOfMonth(new Date(date.year, date.month - 1)),
        end: endOfMonth(new Date(date.year, date.month - 1)),
      }).map((day) => day.getDate()),
    );
  }, [date.year, date.month]);

  return (
    <div className={styles.picker}>
      <div className={styles.pickerTitle}>
        {date.day}/{date.month}/{date.year}|{date.hour}:{date.minute}
      </div>
      <div className={styles.pickerWrapper}>
        <div className={classNames(styles.pickerWheels, styles.pickerDay)}>
          {/* <span className={styles.pickerLabel}>День</span> */}
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={date.day - 1}
            slidesPerView={5}
            loop={true}
            onSlideChange={(swiper) => {
              // Update the date when the current slide changes
              setDate((prevDate) => ({
                ...prevDate,
                day: swiper.realIndex + 1,
              }));
            }}
            className="mySwiper">
            {days.map((day) => (
              <SwiperSlide key={day}>{day}</SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={classNames(styles.pickerWheels, styles.pickerMonth)}>
          {/* <span className={styles.pickerLabel}>Месяц</span> */}
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={date.month - 1}
            slidesPerView={5}
            loop={true}
            onSlideChange={(swiper) => {
              // Update the date when the current slide changes
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
          {/* <span className={styles.pickerLabel}>Год</span> */}
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={years.indexOf(date.year)}
            slidesPerView={5}
            loop={true}
            onSlideChange={(swiper) => {
              // Update the date when the current slide changes
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
        </div>
        <div className={classNames(styles.pickerWheels, styles.pickerHour)}>
          {/* <span className={styles.pickerLabel}>Часы</span> */}
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
          {/* <span className={styles.pickerLabel}>Минуты</span> */}
          <Swiper
            direction={'vertical'}
            centeredSlides={true}
            initialSlide={date.minute}
            slidesPerView={5}
            loop={true}
            onSlideChange={(swiper) => {
              // Update the date when the current slide changes
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
        </div>
      </div>
    </div>
  );
};

export default MobilePicker;
