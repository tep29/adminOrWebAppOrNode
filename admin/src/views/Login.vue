<template>
  <div class="login-conatiner">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const {
        status,
        data: { message, token },
      } = await this.$http.post("login", this.model);

      if (status === 200) {
        this.$message.success({ message });
        localStorage.token = token;
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss">
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>