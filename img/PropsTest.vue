<script>
export default {
  props: {
    msg: {
      type: String,
      default: 'my name is joke'
    },
    text:{
      type: String,
    }

  }, //父組件到子組件
  setup(props) {
    console.log(props)
    return {
      props,

    }
  }
}
</script>
<template>
<h1>
  {{props.msg}}
  {{props.text}}
</h1>
</template>

<style scoped>
h1 {
  color: blue;
  font-size: 50px;
}
</style>
