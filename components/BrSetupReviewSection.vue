<template>
  <div class="full-width q-mb-md">
    <div class="text-h5 row justify-center q-mb-sm">
      <div class="title">
        {{title}}
      </div>
    </div>
    <div class="text-h6 row justify-center">
      <div class="row col-auto">
        <div class="column col-auto">
          <div
            v-for="(fieldName, index) in fieldNames"
            :key="index"
            class="field-name text-right text-bold q-mr-sm">
            {{fieldName}}:
          </div>
        </div>
        <div class="column col-grow">
          <div
            v-for="(fieldValue, index) in fieldValues"
            :key="index"
            class="field-value text-left">
            {{fieldValue}}
          </div>
        </div>
      </div>
    </div>
  </div>
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

.title {
  border-bottom: 1px solid #222;
}

.field-name,
.field-value {
  @include mobile {
    width: 100%;
    text-align: center;
  }
}
</style>
