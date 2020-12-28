<template>
  <div class="">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>

    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属文章">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: { VueEditor },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const { data: { url } } = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image",url);
      resetUploader()
      
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }

      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功！",
      });
    },
    async fetch() {
      const { data } = await this.$http.get(`rest/articles/${this.id}`);
      this.model = data;
    },
    async fetchCategories() {
      const { data } = await this.$http.get(`rest/categories`);

      this.categories = data.filter(({ parent }) => typeof parent !== "object");
    },
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>