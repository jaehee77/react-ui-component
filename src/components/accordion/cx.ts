// CSS 모듈을 사용하여 클래스 이름을 동적으로 결합하는 방법
// scss 아이디,클래스 마지막에 hash값 붙어줌
import classNames from 'classnames/bind';
import style from './index.module.scss';

export const cx = classNames.bind(style);
