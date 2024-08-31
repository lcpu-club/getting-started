<template>
  <div class="FeaturesTitle">
    <div class="container">
      <div class="text">
        {{ $frontmatter.features_title }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.FeaturesTitle {
  padding: 0px 24px 12px;
}

@media (min-width: 640px) {
  .FeaturesTitle {
    padding: 0px 48px 12px;
  }
}

@media (min-width: 960px) {
  .FeaturesTitle {
    padding: 0px 64px 12px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
  }
}

.text {
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 700;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .text {
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .text {
    line-height: 36px;
    font-size: 24px;
  }
}
</style>