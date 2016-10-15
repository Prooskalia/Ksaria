using System;
using JetBrains.Annotations;

namespace Ksaria
{
    internal class ApiRouteAttribute : Attribute
    {
        public ApiRouteAttribute([NotNull] string name)
        {
            Name = name;
        }


        [NotNull] public string Name { get; }
    }
}