using Application.Urls.Models;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfilies : Profile
    {
        public MappingProfilies()
        {
            CreateMap<Url, UrlViewDto>();
        }
    }
}
