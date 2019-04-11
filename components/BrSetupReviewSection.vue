<template>
  <q-card class="full-width q-mb-md">
    <div class="text-h6 row justify-center bg-primary text-white q-py-xs">
      <div class="text-center">
        {{title}}
      </div>
    </div>
    <div class="row justify-center">
      <div class="list q-mb-none q-mt-none q-pl-none full-width">
        <h6
          v-for="(field, index) in fields"
          :key="index"
          class="q-mt-none q-mb-none row justify-center items-center">
          <div class="col-4 text-center text-bold field-name">
            {{field.name}}
          </div>
          <div class="col-8 field-value q-px-md q-py-sm">
            {{field.value}}
          </div>
        </h6>
      </div>
    </div>
  </q-card>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

export default {
  name: 'BrSetupReviewSection',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    fields: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    fieldNames() {
      return this.fields.map(f => f.name);
    },
    fieldValues() {
      return this.fields.map(f => f.value);
    }
  }
};
</script>
<style lang="scss" scoped>
$breakpoint-sm: 767px;
$breakpoint-xs: 320px;

@mixin mobile {
  @media (min-width: #{$breakpoint-xs}) and (max-width: #{$breakpoint-sm}) {
    @content;
  }
}

.field-value {
  word-break: break-all;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}

.field-name,
.field-value {
  @include mobile {
    width: 100%;
    text-align: center;
    border-left: none;
    padding-top: 0;
    padding-bottom: 0;
  }
}

h6 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  @include mobile {
    padding: 8px 0;
  }
}

h6:last-child {
  border-bottom: none;
}
</style>
