<template>
    <div class="ripple-background" :style="containerStyle">
        <div v-for="circle in circles" :key="circle.index" class="circle" :style="circle.style" ></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { MathUtil } from '@/util/MathUtil';

@Component
export default class CircleCircle extends Vue {
    @Prop({ default: 5 }) readonly circleCount !: number;
    @Prop({ default: 350 }) readonly size !: number;
    @Prop({ default: 0.2 }) readonly minOpacity !: number;
    @Prop({ default: 0.9 }) readonly maxOpacity !: number;
    @Prop({ default: 50 }) readonly borderRadius !: number;
    @Prop({ default: '#f0f8ff' }) readonly bkColor !: string;
    @Prop({ default: '#508fb9' }) readonly shadowColor !: string;
    @Prop({ default: 'regular' }) readonly shape !: string;

    index = 0;

    public get containerStyle () {
        return {
            '--bk-color': this.bkColor,
            '--shadow-color': this.shadowColor
        };
    }

    public get circles () {
        let circles: Array<any> = [];

        for (let i = this.circleCount - 1; i >= 0; i--) {
            let percent = i / (this.circleCount - 1);
            let size = MathUtil.percentInRange(percent, this.size / this.circleCount, this.size);
            let opacity = MathUtil.percentInRange(1 - percent, this.minOpacity, this.maxOpacity);
            let offset = (this.size - size) / 2;

            let style = {
                width: size + 'px',
                height: size + 'px',
                left: offset + 'px',
                top: offset + 'px',
                opacity,
                'border-radius': ''
            };

            switch (this.shape) {
                case 'regular':
                    style['border-radius'] = this.borderRadius + '%';
                    break;
                case 'almond':
                    let top = 50 + this.borderRadius;
                    let bottom = 50 - this.borderRadius;
                    style['border-radius'] = `50% 50% 50% 50% / ${top}% ${top}% ${bottom}% ${bottom}%`;
                    break;
            }

            circles.push({ index: this.index++, style });
        }

        return circles;
    }
}
</script>

<style lang="scss" scoped>
.ripple-background {
    position: relative;

    .circle {
        position: absolute;
        background: var(--bk-color);
        animation: ripple 5s infinite;
        box-shadow: 0px 0px 10px 5px var(--shadow-color);
    }
}

@keyframes ripple{
    0%  {
        transform: scale(1);
    }

    50% {
        transform: scale(0.8);
    }

    100%{
        transform: scale(1);
    }
}
</style>
