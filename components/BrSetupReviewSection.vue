<template>
  <div class="full-width">
    <div
      v-for="field in fields"
      :key="field.name">
      <div class="text-h6 row justify-center review-fields">
        <div class="field-name row full-width">
          <div class="text-bold field-name col-3">{{field.name}}:</div>
          <div class="field-value col-9">{{field.value}}</div>
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

.field-name,
.field-value {
  @include mobile {
    width: 100%;
    text-align: center;
  }
}

.field-value {
  word-break: break-word;
}
</style>
