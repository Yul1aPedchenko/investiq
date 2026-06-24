import products from "../../../assets/categoriesIcons/products.svg";
import productsA from "../../../assets/categoriesIcons/products-a.svg";

import alco from "../../../assets/categoriesIcons/alco.svg";
import alcoA from "../../../assets/categoriesIcons/alco-a.svg";

import entertainment from "../../../assets/categoriesIcons/entertainment.svg";
import entertainmentA from "../../../assets/categoriesIcons/entertainment-a.svg";

import health from "../../../assets/categoriesIcons/health.svg";
import healthA from "../../../assets/categoriesIcons/health-a.svg";

import cars from "../../../assets/categoriesIcons/cars.svg";
import carsA from "../../../assets/categoriesIcons/cars-a.svg";

import home from "../../../assets/categoriesIcons/home.svg";
import homeA from "../../../assets/categoriesIcons/home-a.svg";

import tools from "../../../assets/categoriesIcons/tools.svg";
import toolsA from "../../../assets/categoriesIcons/tools-a.svg";

import invoice from "../../../assets/categoriesIcons/invoice.svg";
import invoiceA from "../../../assets/categoriesIcons/invoice-a.svg";

import hobby from "../../../assets/categoriesIcons/hobby.svg";
import hobbyA from "../../../assets/categoriesIcons/hobby-a.svg";

import study from "../../../assets/categoriesIcons/study.svg";
import studyA from "../../../assets/categoriesIcons/study-a.svg";

import other from "../../../assets/categoriesIcons/other.svg";
import otherA from "../../../assets/categoriesIcons/other-a.svg";

import salary from "../../../assets/categoriesIcons/salary.svg";
import salaryA from "../../../assets/categoriesIcons/salary-a.svg";

import extra from "../../../assets/categoriesIcons/extra.svg";
import extraA from "../../../assets/categoriesIcons/extra-a.svg";

export const expenseCategories = ["Продукти", "Алкоголь", "Розваги", "Здоров’я", "Транспорт", "Все для дому", "Техніка", "Комуналка/Зв’язок", "Спорт/Хобі", "Навчання", "Інше"];

export const incomeCategories = ["Зарплата", "Дод дохід"];
type CategoryIcon = {
  default: string;
  active: string;
};
export const categoriesIcons: Record<
  string,
  CategoryIcon
> = {
  "Продукти": {
    default: products,
    active: productsA,
  },
  "Алкоголь": {
    default: alco,
    active: alcoA,
  },
  "Розваги": {
    default: entertainment,
    active: entertainmentA,
  },
  "Здоров’я": {
    default: health,
    active: healthA,
  },
  "Транспорт": {
    default: cars,
    active: carsA,
  },
  "Все для дому": {
    default: home,
    active: homeA,
  },
  "Техніка": {
    default: tools,
    active: toolsA,
  },
  "Комуналка/Зв’язок": {
    default: invoice,
    active: invoiceA,
  },
  "Спорт/Хобі": {
    default: hobby,
    active: hobbyA,
  },
  "Навчання": {
    default: study,
    active: studyA,
  },
  "Інше": {
    default: other,
    active: otherA,
  },

  "Зарплата": {
    default: salary,
    active: salaryA,
  },
  "Дод дохід": {
    default: extra,
    active: extraA,
  },
};
