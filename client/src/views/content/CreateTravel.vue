<template>
  <div class="p-3 bg-light">
    <form class="row g-3 needs-validation" autocomplete="off" novalidate>
      <label class="fs-3">新しい旅行先を作成</label>
      <div class="col-md-6">
        <validation-provider name="行先（国名）" rules="required" v-slot="v">
          <div class="form-floating">
            <input
              name="country"
              type="text"
              :class="['form-control', validateContry(v)]"
              placeholder="行先（国名）"
              v-model="country"
            />
            <label for="floatingInput">行先（国名）</label>
          </div>
          <div class="mt-1 text-danger">{{ v.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="col-md-6">
        <validation-provider name="行先（都市名）" rules="required" v-slot="v">
          <div class="form-floating">
            <input
              name="city"
              type="text"
              :class="['form-control', validateCity(v)]"
              placeholder="行先（都市名）"
              v-model="city"
            />
            <label for="floatingInput">行先（都市名）</label>
          </div>
          <div class="mt-1 text-danger">{{ v.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="col-md-6">
        <validation-provider name="出発日" rules="required" v-slot="v">
          <div class="form-floating">
            <input
              name="departureDate"
              type="date"
              :class="['form-control', validateDepartureDate(v)]"
              placeholder="出発日"
              v-model="departureDate"
            />
            <label for="floatingInput">出発日</label>
          </div>
          <div class="mt-1 text-danger">{{ v.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="col-md-6">
        <validation-provider name="帰還日" rules="required" v-slot="v">
          <div class="form-floating">
            <input
              name="returnDate"
              type="date"
              :class="['form-control', validateReturnDate(v)]"
              placeholder="帰還日"
              v-model="returnDate"
            />
            <label for="floatingInput">帰還日</label>
          </div>
          <div class="mt-1 text-danger">{{ v.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="form-floating">
        <button
          id="submit-btn"
          class="btn btn-primary"
          type="button"
          @click="create"
        >
          旅行を作成
        </button>
        <button
          id="loading-btn"
          class="btn btn-primary display-none"
          type="button"
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
  </div>
</template>

<script>
import { ValidationProvider, localize, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import ja from "vee-validate/dist/locale/ja.json";

extend("required", required);
localize("ja", ja);

export default {
  data() {
    return {
      country: "",
      city: "",
      departureDate: "",
      returnDate: ""
    };
  },
  computed: {
    validateContry() {
      return v => validate(v);
    },
    validateCity() {
      return v => validate(v);
    },
    validateDepartureDate() {
      return v => validate(v);
    },
    validateReturnDate() {
      return v => validate(v);
    }
  },
  components: {
    ValidationProvider
  },
  methods: {
    create() {}
  }
};

/**
 * validationの共通処理
 */
const validate = slotPops => {
  if (slotPops.touched) {
    return slotPops.errors[0] ? "is-invalid" : "is-valid";
  } else {
    return "";
  }
};
</script>