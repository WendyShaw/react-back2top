/* eslint no-unused-vars:0 */

'use strict';

import React,{Component,PropTypes} from 'react';

import raf from 'raf';
import Easing from 'easing-js';
import now from 'performance-now';
import _ from 'lodash';

const privates = new WeakMap();

export const isNumber = (obj) => {
    return typeof obj === 'number' && !Number.isNaN(obj);
};

export const strip = (number) => {
    return parseFloat(number.toPrecision(12));
};

export const isAnimating = (animations) => {
    for (var [, animation] of animations) {
        if (animation.isAnimating) return true;
    }
    return false;
};

const scheduleAnimation = (context) => {
    raf(() => {
        var animations = privates.get(context);
        var currentTime = now();
        var shouldUpdate = false;
        animations && animations.forEach(function (animation, name) {
            var isFunction = typeof name === 'function';
            if (!animation.isAnimating) return;
            var {duration, easing, endValue, startTime, startValue} = animation;
            var deltaTime = currentTime - startTime;
            if (deltaTime >= duration) {
                Object.assign(animation, {isAnimating: false, startTime: currentTime, value: endValue});
            } else {
                animation.value = strip(Easing[easing](deltaTime, startValue, endValue - startValue, duration));
            }
            shouldUpdate = shouldUpdate || !isFunction;
            if (isFunction) name(animation.value);
        });
        if (animations && isAnimating(animations)) scheduleAnimation(context);
        if (shouldUpdate) context.forceUpdate();
    });
};

class Back2Top extends Component {

    static propTypes = {

        // Make the button visible
        alwaysVisible: PropTypes.bool,

        // Duration of fade effect
        fadeDuration: PropTypes.number,

        // Duration of scroll-to-top effect
        scrollDuration: PropTypes.number,

        // Height of button to become visible
        visibilityHeight: PropTypes.number

    };

    static FADE_DURATION = 300;
    static SCROLL_DURATION = 800;
    static VISIBILITY_HEIGHT = 400;

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.updateScroll = this.updateScroll.bind(this);
        this.shouldAnimate = this.shouldAnimate.bind(this);
        this.animate = this.animate.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.isFirefox = this.isFirefox.bind(this);
        this.getScrollTop = this.getScrollTop.bind(this);
        this.setScrollTop = this.setScrollTop.bind(this);

        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.throttledUpdateScroll = _.throttle(this.updateScroll, 100);
        window.addEventListener('scroll', this.throttledUpdateScroll);
    }

    componentWillUnmount() {
        privates.delete(this);
        window.removeEventListener('scroll', this.throttledUpdateScroll);
    }

    shouldAnimate() {
        return true;
    }

    animate(name, endValue, duration, options = {}) {
        var animations = privates.get(this);
        if (!animations) {
            privates.set(this, animations = new Map());
        }
        var animation = animations.get(name);
        var shouldAnimate = this.shouldAnimate() && options.animation !== false;
        if (!animation || !shouldAnimate || !isNumber(endValue)) {
            let easing = options.easing || 'linear';
            let startValue = isNumber(options.startValue) && shouldAnimate ? options.startValue : endValue;
            animation = {duration, easing, endValue, isAnimating: false, startValue, value: startValue};
            animations.set(name, animation);
        }
        if (!duration) {
            Object.assign(animation, {endValue, value: endValue});
            animations.set(name, animation);
        }
        if (animation.value !== endValue && !animation.isAnimating) {
            if (!isAnimating(animations)) scheduleAnimation(this);
            var startTime = 'startTime' in options ? options.startTime : now();
            duration = duration || animation.duration;
            let easing = options.easing || animation.easing;
            let startValue = animation.value;
            Object.assign(animation, {isAnimating: true, endValue, startValue, startTime, duration, easing});
        }
        return animation.value;
    }

    updateScroll() {
        let {visibilityHeight} = this.props;
        this.setState({visible: this.getScrollTop() > (visibilityHeight || Back2Top.VISIBILITY_HEIGHT)});
    }

    scrollToTop(e) {
        if (e) e.preventDefault();
        let {scrollDuration,onClick} = this.props;
        this.animate(value => this.setScrollTop(value), 0,
            scrollDuration || Back2Top.SCROLL_DURATION, {startValue: this.getScrollTop()});
        if (onClick) {
            onClick(e);
        }
    }

    isFirefox() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    }

    getScrollTop() {
        return this.isFirefox() ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    setScrollTop(value) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
    }

    render() {
        var visible = this.props.alwaysVisible || this.state.visible;
        let {href,
            style,
            target,
            onClick,
            className,
            fadeDuration,
            visibilityHeight,
            scrollDuration,
            children,
            ...options
            } = this.props;
        let opacity = this.animate('opacity', visible ? 1 : 0, fadeDuration || Back2Top.FADE_DURATION);
        if (opacity === 0) return false;
        return (
            <a
                className={className || 'back-to-top'}
                {...options}
                aria-label='Back2Top'
                style={{display: 'inline', opacity: opacity}}
                onClick={this.scrollToTop}>
                {children}
            </a>
        );
    }
}

Back2Top.prototype.displayName = 'Back2Top';

export default Back2Top;