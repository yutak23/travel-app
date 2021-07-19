<template>
  <div class="p-3 bg-light">
    <form class="row g-3 needs-validation" autocomplete="off" novalidate>
      <label class="fs-3">新しい旅行先を作成</label>
      <div class="col-md-6 form-floating">
        <input
          name="country"
          type="text"
          class="form-control"
          placeholder="行先（国名）"
          v-model="country"
        />
        <label for="floatingInput">行先（国名）</label>
      </div>
      <div class="col-md-6 form-floating">
        <input
          name="city"
          type="text"
          class="form-control"
          placeholder="行先（都市名）"
          v-model="city"
        />
        <label for="floatingInput">行先（都市名）</label>
      </div>
      <div class="col-md-6 form-floating">
        <input
          name="departureDate"
          type="date"
          class="form-control"
          placeholder="出発日"
          v-model="departureDate"
        />
        <label for="floatingInput">出発日</label>
      </div>
      <div class="col-md-6 form-floating">
        <input
          name="returnDate"
          type="date"
          class="form-control"
          placeholder="帰還日"
          v-model="returnDate"
        />
        <label for="floatingInput">帰還日</label>
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
export default {
  data() {
    return {
      country: "",
      city: "",
      departureDate: "",
      returnDate: ""
    };
  },
  methods: {
    create() {}
  }
};
</script>