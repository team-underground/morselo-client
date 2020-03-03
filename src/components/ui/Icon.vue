<template>
  <svg
    v-if="name === 'apple'"
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
  >
    <g fill-rule="nonzero">
      <path
        d="M46.173 19.967C49.927-1.838 19.797-.233 14.538.21c-.429.035-.648.4-.483.8 2.004 4.825 14.168 31.66 32.118 18.957zm13.18 1.636c1.269-.891 1.35-1.614.047-2.453l-2.657-1.71c-.94-.607-1.685-.606-2.532.129-5.094 4.42-7.336 9.18-8.211 15.24 1.597.682 3.55.79 5.265.328 1.298-4.283 3.64-8.412 8.088-11.534z"
      />
      <path
        d="M88.588 67.75c9.65-27.532-13.697-45.537-35.453-32.322-1.84 1.118-4.601 1.118-6.441 0-21.757-13.215-45.105 4.79-35.454 32.321 5.302 15.123 17.06 39.95 37.295 29.995.772-.38 1.986-.38 2.758 0 20.235 9.955 31.991-14.872 37.295-29.995z"
      />
    </g>
  </svg>

  <svg
    v-else-if="name === 'book'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path
      d="M6 4H5a1 1 0 1 1 0-2h11V1a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-7v8l-2-2-2 2V4z"
    />
  </svg>

  <svg v-else-if="name === 'heart'" viewBox="0 0 20 20" fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clip-rule="evenodd"
    />
  </svg>

  <svg v-else-if="name === 'bookmark'" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
  </svg>

  <svg v-else-if="name === 'user'" viewBox="0 0 20 20" fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clip-rule="evenodd"
    />
  </svg>

  <svg v-else-if="name === 'calendar'" viewBox="0 0 20 20" fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clip-rule="evenodd"
    />
  </svg>

  <svg v-else-if="name === 'clock'" viewBox="0 0 20 20" fill="currentColor">
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script>
export default {
  props: {
    name: String
  }
};
</script>
