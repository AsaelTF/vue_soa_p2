<template>
  <div
    class="w-full font-Roboto text-sm sticky bg-white bottom-0 shadow-sm shadow-black"
  >
    <div class="flex justify-center items-center text-center">
      <div
        @click="changeBottomSelect(1)"
        :class="
          bottomSelect == 1
            ? 'bg-blue-100 text-[#1867C0]'
            : 'bg-none hover:bg-black/5'
        "
        class="w-64 py-3 cursor-pointer transition duration-200 ease-in-out font-semibold"
      >
        <font-awesome-icon :icon="['fas', 'user']" />
        <p>Empleados</p>
      </div>
      <div
        @click="changeBottomSelect(2)"
        :class="
          bottomSelect == 2
            ? 'bg-blue-100 text-[#1867C0]'
            : 'bg-none hover:bg-black/5'
        "
        class="w-64 py-3 cursor-pointer transition duration-200 ease-in-out font-semibold"
      >
        <font-awesome-icon :icon="['fas', 'hammer']" />
        <p>Activos</p>
      </div>
      <div
        @click="changeBottomSelect(6)"
        :class="
          bottomSelect == 6
            ? 'bg-blue-100 text-[#1867C0]'
            : 'bg-none hover:bg-black/5'
        "
        class="w-64 py-3 cursor-pointer transition duration-200 ease-in-out font-semibold"
      >
        <font-awesome-icon :icon="['fas', 'hammer']" />
        <p>Activos-Empleados</p>
      </div>
      <div
        @click="changeBottomSelect(3)"
        :class="
          bottomSelect == 3
            ? 'bg-blue-100 text-[#1867C0] '
            : 'bg-none hover:bg-black/5'
        "
        class="w-64 py-3 cursor-pointer transition duration-200 ease-in-out font-semibold"
      >
        <font-awesome-icon :icon="['fas', 'person-harassing']" />
        <p>Asignar</p>
      </div>
      <div
        @click="changeBottomSelect(4)"
        :class="
          bottomSelect == 4
            ? 'bg-blue-100 text-[#1867C0] '
            : 'bg-none hover:bg-black/5'
        "
        class="w-64 py-3 cursor-pointer transition duration-200 ease-in-out font-semibold"
      >
        <font-awesome-icon :icon="['fas', 'file-powerpoint']" />
        <p>Registrar empleado</p>
      </div>
      <div
        @click="changeBottomSelect(5)"
        :class="
          bottomSelect == 5
            ? 'bg-blue-100 text-[#1867C0] '
            : 'bg-none hover:bg-black/5'
        "
        class="w-64 py-3 cursor-pointer transition duration-200 ease-in-out font-semibold"
      >
        <font-awesome-icon :icon="['fas', 'file-circle-question']" />
        <p>Registrar activo</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottomSelect: 1,
    };
  },
  methods: {
    changeBottomSelect(bottomSelect) {
      this.bottomSelect = bottomSelect;
      if (this.bottomSelect == 1) {
        this.$router.push("/empleados");
      } else if (this.bottomSelect == 2) {
        this.$router.push("/activos");
      } else if (this.bottomSelect == 3) {
        this.$router.push("/asignar");
      } else if (this.bottomSelect == 4) {
        this.$router.push("/registrar/empleado");
      } else if (this.bottomSelect == 5) {
        this.$router.push("/registrar/activo");
      } else{
        this.$router.push("/activos-empleados")
      }
    },
  },
};
</script>

<style></style>
