using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using JetBrains.Annotations;

namespace Ksaria
{
    public class ApiRouteTable
    {
        private const string CONTROLLER_SUFFIX = "Controller";


        [NotNull]
        public ApiRouteTable LoadRoutes([NotNull] Assembly assembly)
        {
            var controllers = assembly
                .ExportedTypes
                ?.Where(t => typeof(IApiController).IsAssignableFrom(t))
                ?? new List<Type>();

            foreach (var controller in controllers)
            {
                var constructor = controller.GetConstructor(Type.EmptyTypes);

                if (constructor != null)
                {
                    var classNameAttribute = controller.GetCustomAttribute<ApiRouteAttribute>();
                    var className = (classNameAttribute?.Name ??
                                     (!controller.Name.EndsWith(CONTROLLER_SUFFIX)? controller.Name:
                                         controller.Name.Substring(
                                             controller.Name.Length - CONTROLLER_SUFFIX.Length)))
                        .ToLowerInvariant();






                }
            }
            return this;
        }


        [NotNull] public IReadOnlyDictionary<string, Func<IApiController>> Routes =>
            new Dictionary<string, Func<IApiController>>(StringComparer.InvariantCultureIgnoreCase);
    }
}