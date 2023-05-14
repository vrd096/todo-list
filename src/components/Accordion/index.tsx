import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import styles from './Accordion.module.scss';

export const AccordionTasks = () => {
  return (
    <Accordion allowZeroExpanded className={styles.accordionMain}>
      <AccordionItem className={styles.accordionItem}>
        <AccordionItemHeading>
          <AccordionItemButton className={styles.accordionButton}>Завершенные</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={styles.accordionPanel}></AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};
