using System.Web;
using JetBrains.Annotations;

namespace Ksaria
{
    public class ApiRequest
    {
        public ApiRequest([NotNull] HttpRequest request)
        {
            var path = request.Url.AbsolutePath.Split('/');
            var startIndex = 0;

            // Skip the leading blank that split will always produce.
            if (path.Length > startIndex && string.IsNullOrWhiteSpace(path[startIndex]))
            {
                ++startIndex;
            }
        }
    }
}