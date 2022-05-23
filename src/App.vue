<template>
  <div id="app">
    <app-calc />
  </div>
</template>

<script>
import AppCalc from '@/components/AppCalc.vue'
export default {
  name: 'App',
  components: { AppCalc },
}
</script>

<style>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.check input:checked + label:after,
.check_2 input:checked + label:after,
.check.check_3 label input:checked + span.checked {
  opacity: 1;
}
.calculation_wrap {
  width: 100%;
  padding: 60px 16px 0;
  margin: 0 auto 120px;
}
@media (min-width: 760px) {
  .calculation_wrap {
    width: 1200px;
  }
}

body {
  font-size: 16px;
  color: #000000;
  letter-spacing: 0.01em;
  position: relative;
}

input[type='text'] {
  width: 100%;
  margin: 0 0 28px 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 56px;
  height: 56px;
  color: #333333;
  background: none;
  border: 3px solid #e4e4e4;
  padding: 0 26px;
  border-radius: 4px;
}

h3 {
  font-weight: 600;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 23px;
}

.check {
  display: flex;
  margin: 0 0 40px 0;
  position: relative;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: flex-start;
}

.check label {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: rgba(0, 0, 0, 0.9);
  position: relative;
  padding: 0 0 0 60px;
  cursor: pointer;
}

.calculator_wrap .check label {
  font-size: 16px;
  display: flex;
  height: 38px;
  align-items: center;
  white-space: nowrap;
}

label:before,
label:before,
.check.check_3 label:before {
  content: '';
  position: absolute;
  left: 0;
  width: 38px;
  top: 0px;
  height: 38px;
  background-image: none;
  background: #f2f4f7;
  border: 2px solid #0181ca;
  box-sizing: border-box;
  border-radius: 4px;
}

.check label:after,
label:after,
.check.check_3 label span.checked {
  display: block;
  content: '';
  position: absolute;
  top: 11px;
  left: 11px;
  width: 18px;
  height: 18px;
  background: url(@/assets/tick.png);
  opacity: 0;
  transition: 0.2s;
}

.calculator_block {
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;
}

.check input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  left: 14px;
  bottom: 14px;
}

.check.check_3 label span.checked {
  display: block;
  content: '';
  position: absolute;
  top: 11px;
  left: 11px;
  width: 18px;
  height: 18px;
  background: url('@/assets/tick.png');
  opacity: 0;
  transition: 0.2s;
}

.check label strong {
  font-size: 16px;
}

.label_price_block {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
}

p {
  line-height: 26px;
  margin: 10px 0;
}
.border_price {
  width: 100%;
  border-bottom: 1px dashed #000;
  margin: 0 15px;
}

.label_price {
  white-space: nowrap;
  font-weight: 600;
}
</style>
