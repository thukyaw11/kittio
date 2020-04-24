<template>
  <div>
    <a-alert
      message="Error"
      :description=title
      type="error"
      closable
      @close="onClose"
    
    />
  </div>
</template>


<script>
export default {
    props : ['title'],
    methods: {
        onClose(){
            console.log("closed")
        }
    }
}
</script>