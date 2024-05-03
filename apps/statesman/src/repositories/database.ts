

// function deprecatedMethod(target: Function, context) {
//     if (context.kind === "method") {
//       return  (...args: any[]) => {
//         console.log(`${context.name} is deprecated and will be removed in a future version.`)
//         return target.apply(this, args)
//       }
//     }
//   }