<template>
  <div class="p-3 bg-light">
    <ValidationObserver v-slot="observer">
      <form
        class="row g-3 needs-validation"
        autocomplete="off"
        novalidate
        @submit.prevent="observer.handleSubmit(create)"
      >
        <label class="fs-3">新しい旅行先を作成</label>
        <div class="col-md-6">
          <ValidationProvider name="行先（国名）" rules="required" v-slot="v">
            <div class="form-floating">
              <input
                name="country"
                type="text"
                :class="['form-control', v.classes]"
                placeholder="行先（国名）"
                v-model="country"
              />
              <label for="floatingInput">行先（国名）</label>
            </div>
            <div class="mt-1 text-danger">{{ v.errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div class="col-md-6">
          <ValidationProvider name="行先（都市名）" rules="required" v-slot="v">
            <div class="form-floating">
              <input
                name="city"
                type="text"
                :class="['form-control', v.classes]"
                placeholder="行先（都市名）"
                v-model="city"
              />
              <label for="floatingInput">行先（都市名）</label>
            </div>
            <div class="mt-1 text-danger">{{ v.errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div class="col-md-6">
          <ValidationProvider name="出発日" rules="required" v-slot="v">
            <div class="form-floating">
              <input
                name="departureDate"
                type="date"
                :class="['form-control', v.classes]"
                placeholder="出発日"
                v-model="departureDate"
              />
              <label for="floatingInput">出発日</label>
            </div>
            <div class="mt-1 text-danger">{{ v.errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div class="col-md-6">
          <ValidationProvider name="帰還日" rules="required" v-slot="v">
            <div class="form-floating">
              <input
                name="returnDate"
                type="date"
                :class="['form-control', v.classes]"
                placeholder="帰還日"
                v-model="returnDate"
              />
              <label for="floatingInput">帰還日</label>
            </div>
            <div class="mt-1 text-danger">{{ v.errors[0] }}</div>
          </ValidationProvider>
        </div>
        <div class="form-floating">
          <button class="btn btn-primary" type="submit">
            旅行を作成
          </button>
          <button
            id="loading-btn"
            class="btn btn-primary display-none"
            type="submit"
            disabled
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            作成中...
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
  configure
} from "vee-validate";
import { required } from "vee-validate/dist/rules";
import ja from "vee-validate/dist/locale/ja.json";

extend("required", required);
localize("ja", ja);
configure({
  classes: {
    valid: "is-valid",
    invalid: "is-invalid"
  }
});

export default {
  data() {
    return {
      country: "",
      city: "",
      departureDate: "",
      returnDate: ""
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    create() {}
  }
};
</script>