<template>
  <div
    class="sub-card"
    :style="card.css"
    @click="$emit('clickCard', card.id)"
  >
    <div class="card-content">
      <div class="icon">
        <img :src="card.icon"/>
      </div>
      <div class="info">
        <p><strong>{{ card.name }}</strong></p>
        <p>{{ card.build_id }}</p>
        <p>{{ card.pub_time?card.pub_time.replace(/-/g, '.'):'' }}</p>
        <p>{{ card.type }}</p>
      </div>
      <div class="button">
        <a-button ghost>
          {{ card.button }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SubCard',
    props: {
      card: Object,
      default: {
        pub_time: ''
      }
    }
  }
</script>

<style lang="less" scoped>
  .sub-card {
    height: 280px;
    width: 210px;
    border-radius: 18px;
    cursor: pointer;

    .card-content {
      height: 100%;

      .icon {
        width: 80px;
        padding: 36px 0 0 0;
        margin: 0 auto;
        overflow: hidden;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }

      .info {
        color: #ffffff;
        text-align: center;
        padding: 13px;
        margin: 0 auto;
        white-space: normal;
        font-size: 12px;
        font-weight: 500;

        p {
          padding: 0 0 5px 0;
        }
      }

      .button {
        text-align: center;

        .ant-btn {
          width: 48%;
          border-radius: 25px;
          font-size: 12px;
          height: 26px;
        }

        .ant-btn, .ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active {
          text-decoration: none;
          background: #ffffff;
          border-color: #ffffff;
          color: #ffffff;
        }
      }

    }

  }

</style>
